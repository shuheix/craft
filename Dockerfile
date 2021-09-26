FROM ruby:2.7.2

RUN apt-get update && \
    apt-get install -y nodejs yarn mariadb-server

RUN mkdir /craft
COPY Gemfile /craft/Gemfile
COPY Gemfile.lock /craft/Gemfile.lock

RUN bundle install

CMD ["rails", "s", "-b","0.0.0.0"]
