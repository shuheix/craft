10.times do |n|
  Company.create!(
    name: "company_name_#{n}",
    email: "abcde@_#{n}"
  )
  User.create!(
    name: "name_#{n}",
    email: "abc@_#{n}"
  )
end
