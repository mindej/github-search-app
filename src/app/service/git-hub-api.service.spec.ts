import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { GitHubApiService } from './git-hub-api.service'
import { GitHubApiRepoSearchResult, Item } from '../dto/git-hub-api-repo-search-result'
import { Contributor } from '../dto/contributor'

describe('GitHubApiService', () => {
    let httpMock: HttpTestingController
    let service: GitHubApiService

    const _apiURL: string = 'https://api.github.com'

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GitHubApiService],
        })
    })
    it('should be created', () => {
        service = TestBed.get(GitHubApiService)
        httpMock = TestBed.get(HttpTestingController)

        expect(service).toBeTruthy()
        expect(httpMock).toBeTruthy()
    })

    describe('user calls:', () => {
        beforeEach(() => {
            service = TestBed.get(GitHubApiService)
            httpMock = TestBed.get(HttpTestingController)
        })

        afterEach(() => {
            httpMock.verify()
        })

        it('#getRepositories should return Observable<GitHubApiRepoSearchResult>', () => {
            const mockData: GitHubApiRepoSearchResult = new GitHubApiRepoSearchResult()
            const searchQuery = 'Test-query'

            service.getRepositories(searchQuery).subscribe(data => {
                expect(data).toBe(mockData)
            })

            const req = httpMock.expectOne(`${_apiURL}/search/repositories?q=${searchQuery}&sort=stars&order=desc`)
            expect(req.request.method).toBe('GET')
            req.flush(mockData)
        })

        it('#getRepository should return Observable<Item>', () => {
            const mockData: Item = new Item()
            const testUser = 'Test-user'
            const testRepo = 'Test-repo'

            service.getRepository(testUser, testRepo).subscribe(data => {
                expect(data).toBe(mockData)
            })

            const req = httpMock.expectOne(`${_apiURL}/repos/${testUser}/${testRepo}`)
            expect(req.request.method).toBe('GET')
            req.flush(mockData)
        })

        it('#getContributors should return Observable<Contributor[] with valid data', () => {
            const mockData: Contributor[] = []
            const testUrl = `${_apiURL}/test/1`

            service.getContributors(testUrl).subscribe(data => {
                expect(data).toBe(mockData)
            })

            const req = httpMock.expectOne(testUrl)
            expect(req.request.method).toBe('GET')
            req.flush(mockData)
        })
        it('#getContributors should return Observable<Contributor[] with in valid data', () => {
            const testUrl = `https://test/test/1`

            service.getContributors(testUrl).subscribe(data => {
                expect(data).toBe(null)
            })
        })
    })
})
