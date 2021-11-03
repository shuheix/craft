FROM ruby:2.7.2

RUN apt-get update && \
    apt-get install -y nodejs yarn mariadb-server && \
    apt-get install cron -y

WORKDIR /craft/backend
COPY Gemfile /craft/backend/Gemfile
COPY Gemfile.lock /craft/backend/Gemfile.lock

RUN gem install bundler
RUN bundle install
CMD ["rails", "s", "-b","0.0.0.0"]

