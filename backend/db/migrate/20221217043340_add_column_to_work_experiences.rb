class AddColumnToWorkExperiences < ActiveRecord::Migration[7.0]
  def change
    add_reference :work_experiences, :user, foreign_key: true
  end
end
