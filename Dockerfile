FROM nginx

COPY dist/github-search-app /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d

EXPOSE 80