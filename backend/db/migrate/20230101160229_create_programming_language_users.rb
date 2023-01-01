class CreateProgrammingLanguageUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :programming_language_users do |t|
      t.references :user, index: true
      t.references :programming_Language, index: true
      t.timestamps
    end
  end
end
