class CreateAchivements < ActiveRecord::Migration[7.0]
  def change
    create_table :achivements do |t|
      t.string :title
      t.string :text
      t.string :urls
      t.datetime :start_time
      t.datetime :finished_time
      t.references :user, null:false
      t.timestamps
    end
  end
end
