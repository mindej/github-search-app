# Github Search App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Installation instructions

Install angular cli run `npm install -g @angular/cli`

Install dependencies run `npm install`

### Add GitHub token

Rename file `/src/environments/environment.dev.ts` to `/src/environments/environment.ts` and replace 'XXX' with your token in file

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Production

Please update `/src/environments/environment.prod.ts` with valid values.

### Compilation

```
ng build --prod
```

### Run

```
docker-compose up
```

## IDE

Project is developed using [Visual Studio Code](https://code.visualstudio.com/). Code is formated automatically using [Prettier](https://prettier.io/) on file save and on commit.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
