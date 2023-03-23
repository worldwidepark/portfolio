class ProgrammingLanguage < ApplicationRecord
  has_many :programming_language_users, dependent: :destroy
  has_many :users, through: :programming_language_users
end
