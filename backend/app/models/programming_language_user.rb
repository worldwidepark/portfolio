class ProgrammingLanguageUser < ApplicationRecord
  belongs_to :user
  belongs_to :programming_language
end
