FactoryBot.define do
  factory :comment do
    text { 'commentの内容' }
    association :article
    user { article.user }
  end
end
