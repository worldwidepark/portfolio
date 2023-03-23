class ChangeProgrammingLanguagesToProgrammingLanguages < ActiveRecord::Migration[7.0]
  def change
    rename_table :programming_Languages, :programming_languages
  end
end
