import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GitHubApiService } from '../service/git-hub-api.service'
import { Item } from '../dto/git-hub-api-repo-search-result'
import { GitHubWeeklyCommitCount } from '../dto/git-hub-weekly-commit-count'
import { forkJoin } from 'rxjs'

import { ChartDataSets, ChartOptions } from 'chart.js'
import { Color, Label } from 'ng2-charts'

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    public user: string
    public repository: string
    public repositoryData: Item
    public starStatus: boolean
    public contributorsCount: number
    public weeklyCommitCount: GitHubWeeklyCommitCount
    public effectiveHoursSpent: number

    public lineChartData: ChartDataSets[] = [{ data: [], label: 'Effective Hours spent per year' }]
    public lineChartLabels: Label[] = []

    public lineChartOptions: ChartOptions = {
        responsive: true,
    }
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ]

    constructor(private gitHubApiService: GitHubApiService, route: ActivatedRoute) {
        this.starStatus = false
        route.params.subscribe(data => {
            this.user = data.user
            this.repository = data.repository
        })
    }

    ngOnInit() {
        this.gitHubApiService.getRepository(this.user, this.repository).subscribe(data => {
            this.repositoryData = data
            forkJoin([
                this.gitHubApiService.getContributors(this.repositoryData.contributors_url),
                this.gitHubApiService.getWeeklyCommitCount(`${this.user}/${this.repository}`),
            ]).subscribe(data => {
                this.contributorsCount = data[0].length
                this.weeklyCommitCount = data[1]
                this._calculateEffectiveHoursSpent()
            })
        })

        this.gitHubApiService.starStatus(`${this.user}/${this.repository}`).subscribe(status => (this.starStatus = true))
    }

    starProject() {
        if (this.starStatus) {
            this.gitHubApiService.unStar(`${this.user}/${this.repository}`).subscribe(
                result => {
                    this.starStatus = false
                },
                error => console.log('error: ', error)
            )
        } else {
            this.gitHubApiService.star(`${this.user}/${this.repository}`).subscribe(
                result => {
                    this.starStatus = true
                },
                error => console.log('error: ', error)
            )
        }
    }

    /**
     * Prepare data for a chart and UI
     */
    private _calculateEffectiveHoursSpent() {
        let commitCount = 0
        let data: number[] = []
        let currentWeekNumber = this._getCurrentWeek()
        let year = new Date().getFullYear() - 1
        this.weeklyCommitCount.all.forEach((element, index) => {
            commitCount += element
            data.push(this._getCalculateEffectiveHoursSpentValue(element))
            this.lineChartLabels.push(this._getCartLabel(year, currentWeekNumber++))
            if (currentWeekNumber > 52) {
                year++
                currentWeekNumber = 1
            }
        })
        this.lineChartData[0].data = data // Hack to resolve compile problems with TS compiler
        this.effectiveHoursSpent = this._getCalculateEffectiveHoursSpentValue(commitCount)
    }

    /**
     * Effective Hours spent = Contributors * Commits / Current Issue count
     */
    private _getCalculateEffectiveHoursSpentValue(commitCount: number): number {
        return (this.contributorsCount * commitCount) / this.repositoryData.open_issues_count
    }

    private _getCartLabel(year: number, week: number): string {
        return `${year} week ${week}`
    }
    /**
     * Get current week number
     */
    private _getCurrentWeek(): number {
        const date = new Date()
        const dateJan = new Date(date.getFullYear(), 0, 1)
        return Math.ceil(((date.getTime() - dateJan.getTime()) / 86400000 + dateJan.getDay() + 1) / 7)
    }
}
