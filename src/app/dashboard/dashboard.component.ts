import { Component, OnInit } from '@angular/core'

import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { GitHubApiService } from '../service/git-hub-api.service'
import { Item } from '../dto/git-hub-api-repo-search-result'
import { FormControl } from '@angular/forms'

import { GitHubStarred } from '../dto/git-hub-starred'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public searchFormControl: FormControl
    public searching = false
    public searchFailed = false
    public searchResults: Item[]
    public starredMap: Map<string, GitHubStarred>

    constructor(private gitHubApiService: GitHubApiService) {}

    ngOnInit() {
        this.searchFormControl = new FormControl()
        let debounce = this.searchFormControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        )
        debounce.subscribe(searchQuery => {
            this.searching = true
            this.searchFailed = false
            this.gitHubApiService.getRepositories(searchQuery).subscribe(
                searchResult => {
                    this.searchResults = searchResult.items
                    this.searching = false
                },
                error => {
                    this.searching = false
                    this.searchFailed = true
                }
            )
        })
        this.gitHubApiService.getUserStarred().subscribe(
            starred => {
                this.starredMap = new Map<string, GitHubStarred>()
                starred.forEach(i => {
                    this.starredMap.set(i.full_name, i)
                })
            },
            error => {
                console.log('Error: ', error)
            }
        )
    }
}
