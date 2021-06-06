20.times do |n|
  Company.create!(
    name: "company_name_#{n}",
    email: "abcde@_#{n}"
  )
  User.create!(
    name: "name_#{n}",
    email: "abc@_#{n}"
  )
end

5.times do |n|
  Article.create!(
    name: "name_is_#{n}番目の名前",
    text: "name_is_#{n}番目の記事",
    user_id: 1
  )
end

5.times do |n|
  Article.create!(
    name: "name_is_#{n}番目の名前",
    text: "name_is_#{n}番目の記事",
    user_id: 2
  )
end

5.times do |n|
  Article.create!(
    name: "name_is_#{n}番目の名前",
    text: "name_is_#{n}番目の記事",
    user_id: 3
  )
end
