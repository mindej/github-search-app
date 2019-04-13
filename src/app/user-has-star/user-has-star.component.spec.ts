import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserHasStarComponent } from './user-has-star.component'
import { GitHubApiService } from '../service/git-hub-api.service'
import { GitHubStarred } from '../dto/git-hub-starred'

describe('UserHasStarComponent', () => {
    let component: UserHasStarComponent
    let fixture: ComponentFixture<UserHasStarComponent>

    let mockGitHubApiService

    beforeEach(async(() => {
        mockGitHubApiService = jasmine.createSpyObj(['getRepositories', 'getUserStarred'])
        TestBed.configureTestingModule({
            declarations: [UserHasStarComponent],
        })
            .overrideProvider(GitHubApiService, { useValue: mockGitHubApiService })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(UserHasStarComponent)
        component = fixture.componentInstance
        component.repository = 'Test_Repository'
        component.starred = new Map<string, GitHubStarred>()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('UI should not have star', () => {
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('span')).toBeTruthy()
        expect(compiled.querySelector('span').getAttribute('class')).toContain('icon-star-empty')
    })

    describe('add start', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(UserHasStarComponent)
            component = fixture.componentInstance
            component.repository = 'Test_Repository'
            component.starred = new Map<string, GitHubStarred>()
            component.starred.set('Test_Repository', new GitHubStarred())
            fixture.detectChanges()
        })

        it('UI should not have star', () => {
            const compiled = fixture.debugElement.nativeElement
            expect(compiled.querySelector('span')).toBeTruthy()
            expect(compiled.querySelector('span').getAttribute('class')).toContain('icon-star-full')
        })
    })
})
