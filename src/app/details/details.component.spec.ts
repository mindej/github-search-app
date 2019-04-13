import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DetailsComponent } from './details.component'
import { GitHubApiService } from '../service/git-hub-api.service'
import { of, Observable } from 'rxjs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ChartsModule } from 'ng2-charts'
import { RouterModule, ActivatedRoute } from '@angular/router'

import { APP_BASE_HREF } from '@angular/common'
import { Item } from '../dto/git-hub-api-repo-search-result'
import { GitHubWeeklyCommitCount } from '../dto/git-hub-weekly-commit-count'

describe('DetailsComponent', () => {
    let component: DetailsComponent
    let fixture: ComponentFixture<DetailsComponent>

    let mockGitHubApiService, mockActivatedRoute

    beforeEach(async(() => {
        mockActivatedRoute = { params: of({ user: 'test_owner', repository: 'test_repository' }) }
        mockGitHubApiService = jasmine.createSpyObj(['getRepository', 'getContributors', 'getWeeklyCommitCount', 'starStatus', 'unStar', 'star'])
        TestBed.configureTestingModule({
            declarations: [DetailsComponent],
            imports: [ChartsModule, RouterModule.forRoot([])],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
        })
            .overrideProvider(GitHubApiService, { useValue: mockGitHubApiService })
            .overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute })
            .compileComponents()
    }))
    let mockRepositoryData: Item = new Item()
    mockRepositoryData.open_issues_count = 2

    let mockWeeklyCommitCount: GitHubWeeklyCommitCount = new GitHubWeeklyCommitCount()
    mockWeeklyCommitCount.all = [3, 4]

    beforeEach(() => {
        jasmine.clock().mockDate(new Date(2018, 4, 12)) // Mock data object

        mockGitHubApiService.getRepository.and.returnValue(of(mockRepositoryData))
        mockGitHubApiService.starStatus.and.returnValue(of({}))
        mockGitHubApiService.getContributors.and.returnValue(of([1, 2, 3]))
        mockGitHubApiService.getWeeklyCommitCount.and.returnValue(of(mockWeeklyCommitCount))

        fixture = TestBed.createComponent(DetailsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
        expect(component.ngOnInit).toBeTruthy()
    })

    it('validate route params', () => {
        expect(component).toBeTruthy()
        expect(component.user).toBe('test_owner')
        expect(component.repository).toBe('test_repository')
    })

    it('validate ngOnInit data from service', () => {
        expect(component.repositoryData).toBe(mockRepositoryData)
        expect(component.contributorsCount).toBe(3)
        expect(component.weeklyCommitCount).toBe(mockWeeklyCommitCount)
        expect(component.effectiveHoursSpent).toBe(10.5)
    })
    it('validate chart data', () => {
        expect(component.lineChartData[0].data).toEqual([4.5, 6])
        expect(component.lineChartLabels).toEqual(['2017 week 19', '2017 week 20'])
    })
    it('validate UI elements', () => {
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('button')).toBeTruthy()
    })
})
