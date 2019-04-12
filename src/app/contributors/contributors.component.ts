import { Component, OnInit, Input } from '@angular/core'
import { GitHubApiService } from '../service/git-hub-api.service'

@Component({
    selector: 'app-contributors',
    templateUrl: './contributors.component.html',
    styleUrls: ['./contributors.component.scss'],
})
export class ContributorsComponent implements OnInit {
    @Input() url: string

    public count: number

    constructor(private gitHubApiService: GitHubApiService) {}

    ngOnInit() {
        this.gitHubApiService.getContributors(this.url).subscribe(result => {
            this.count = result.length
        })
    }
}
