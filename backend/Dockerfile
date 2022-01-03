FROM ruby:2.7.2

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && \
    apt-get install -y nodejs npm yarn mariadb-server && npm install n -g && n 14.18.2 \
    apt-get install cron -y && \
    apt-get install vim -y

WORKDIR /craft/backend
COPY Gemfile /craft/backend/Gemfile
COPY Gemfile.lock /craft/backend/Gemfile.lock

RUN gem install bundler
RUN bundle install
CMD ["rails", "s", "-b","0.0.0.0"]

