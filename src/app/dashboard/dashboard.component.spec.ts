import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { GitHubApiService } from '../service/git-hub-api.service'
import { DashboardComponent } from './dashboard.component'
import { of } from 'rxjs'

describe('DashboardComponent', () => {
    let component: DashboardComponent
    let fixture: ComponentFixture<DashboardComponent>

    let mockGitHubApiService

    beforeEach(async(() => {
        mockGitHubApiService = jasmine.createSpyObj(['getRepositories', 'getUserStarred'])
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .overrideProvider(GitHubApiService, { useValue: mockGitHubApiService })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent)
        component = fixture.componentInstance
        mockGitHubApiService.getRepositories.and.returnValue(of({ items: [] }))
        mockGitHubApiService.getUserStarred.and.returnValue(of([]))
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
        expect(component.ngOnInit).toBeTruthy()
    })

    describe('init', () => {
        beforeEach(() => {
            component.ngOnInit()
        })

        it(`should have as searchFormControl created`, () => {
            expect(component.searchFormControl).toBeTruthy()
        })

        it('should have form', () => {
            expect(component).toBeTruthy()

            const compiled = fixture.debugElement.nativeElement
            expect(compiled.querySelector('form')).toBeTruthy()
        })

        it('should have called api Service calls', () => {
            expect(component).toBeTruthy()

            expect(mockGitHubApiService.getRepositories).toHaveBeenCalled
            expect(mockGitHubApiService.getUserStarred).toHaveBeenCalled
        })
    })
})
