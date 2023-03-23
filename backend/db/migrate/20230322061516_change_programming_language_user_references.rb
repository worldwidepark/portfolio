class ChangeProgrammingLanguageUserReferences < ActiveRecord::Migration[7.0]
  def change
    remove_reference :programming_language_users, :programming_Language, index: true
  end
end
