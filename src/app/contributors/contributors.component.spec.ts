import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'

import { ContributorsComponent } from './contributors.component'
import { GitHubApiService } from '../service/git-hub-api.service'
import { of } from 'rxjs'

describe('ContributorsComponent', () => {
    let component: ContributorsComponent
    let fixture: ComponentFixture<ContributorsComponent>

    let mockGitHubApiService

    beforeEach(async(() => {
        mockGitHubApiService = jasmine.createSpyObj(['getContributors'])
        TestBed.configureTestingModule({
            declarations: [ContributorsComponent],
            imports: [HttpClientModule],
        })
            .overrideProvider(GitHubApiService, { useValue: mockGitHubApiService })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ContributorsComponent)
        component = fixture.componentInstance
        component.url = 'http://test.host'
        mockGitHubApiService.getContributors.and.returnValue(of([1, 2, 3]))

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should contributors count on a screen', () => {
        expect(component).toBeTruthy()

        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('div').textContent).toContain('3')
        expect(mockGitHubApiService.getContributors).toHaveBeenCalled()
    })
})
