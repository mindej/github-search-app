import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GitHubApiRepoSearchResult, Item } from '../dto/git-hub-api-repo-search-result'
import { GitHubLogin } from '../dto/git-hub-login'
import { Observable } from 'rxjs'
import { Contributor } from '../dto/contributor'
import { GitHubStarred } from '../dto/git-hub-starred'
import { GitHubWeeklyCommitCount } from '../dto/git-hub-weekly-commit-count'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class GitHubApiService {
    private apiURL: string = 'https://api.github.com'

    constructor(private httpClient: HttpClient) {}

    /**
     * Get repository metadata for search query
     */
    public getRepositories(searchQuery: string): Observable<GitHubApiRepoSearchResult> {
        return this.httpClient.get<GitHubApiRepoSearchResult>(`${this.apiURL}/search/repositories?q=${searchQuery}&sort=stars&order=desc`)
    }

    public getRepository(user: string, repository: string): Observable<Item> {
        return this.httpClient.get<Item>(`${this.apiURL}/repos/${user}/${repository}`, this._getAuthOptions())
    }

    public getContributors(url: string): Observable<Contributor[]> {
        if (url.startsWith('https://api.github.com/')) {
            return this.httpClient.get<Contributor[]>(url, this._getAuthOptions())
        }
        return null
    }

    /**
     * Get a list of user stared projects
     */
    public getUserStarred(): Observable<GitHubStarred[]> {
        return this.httpClient.get<GitHubStarred[]>(`${this.apiURL}/user/starred`, this._getAuthOptions())
    }

    /**
     * Get star status for a current repository.
     * Return if user has stared Status: 204 No Content other wise 404
     * @param repository full name
     */
    public starStatus(repository: string) {
        return this.httpClient.get<string>(`${this.apiURL}/user/starred/${repository}`, this._getAuthOptions())
    }

    /**
     * Add a star on repository.
     * @param repository full name
     */
    public star(repository: string) {
        return this.httpClient.put<string>(`${this.apiURL}/user/starred/${repository}`, {}, this._getAuthOptions())
    }

    public unStar(repository: string) {
        return this.httpClient.delete<string>(`${this.apiURL}/user/starred/${repository}`, this._getAuthOptions())
    }
    /**
     * Get the weekly commit count for the repository owner and everyone else.
     * Response
     * Returns the total commit counts for the owner and total commit counts in all.
     * all is everyone combined, including the owner in the last 52 weeks.
     * If you'd like to get the commit counts for non-owners, you can subtract owner from all.
     * The array order is oldest week (index 0) to most recent week.
     * @param repository full name
     */
    public getWeeklyCommitCount(repository: string): Observable<GitHubWeeklyCommitCount> {
        return this.httpClient.get<GitHubWeeklyCommitCount>(`${this.apiURL}/repos/${repository}/stats/participation`, this._getAuthOptions())
    }

    public authenticate(token: string) {
        return this.httpClient.get<GitHubLogin>(`${this.apiURL}/user`, this._getAuthOptions())
    }

    private _getAuthOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `token ${environment.gitHubToken}`,
            }),
        }
    }
}
