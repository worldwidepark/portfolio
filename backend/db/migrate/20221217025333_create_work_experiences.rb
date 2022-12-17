class CreateWorkExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :work_experiences do |t|
      t.string :job_title
      t.text :duties
      t.integer :dates_of_employment
      t.text :achievements
      t.timestamps
    end
  end
end
