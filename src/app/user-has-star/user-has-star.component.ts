import { Component, OnInit, Input } from '@angular/core'
import { GitHubStarred } from '../dto/git-hub-starred'
import { GitHubApiService } from '../service/git-hub-api.service'

@Component({
    selector: 'app-user-has-star',
    templateUrl: './user-has-star.component.html',
    styleUrls: ['./user-has-star.component.scss'],
})
export class UserHasStarComponent implements OnInit {
    @Input() repository: string
    @Input() starred: Map<string, GitHubStarred>

    public star: boolean

    constructor(private gitHubApiService: GitHubApiService) {}

    ngOnInit() {
        this.star = this.starred.get(this.repository) ? true : false
    }

    public starProject() {
        if (this.star) {
            this.gitHubApiService.unStar(this.repository).subscribe(
                result => {
                    this.star = false
                },
                error => console.log('Error: ', error)
            )
        } else {
            this.gitHubApiService.star(this.repository).subscribe(
                result => {
                    this.star = true
                },
                error => console.log('Error: ', error)
            )
        }
    }
}
