class AddProgrammingLanguageUserReferences < ActiveRecord::Migration[7.0]
  def change
    add_reference :programming_language_users, :programming_language, index: true
  end
end
