class CreateJobOpenings < ActiveRecord::Migration[7.0]
  def change
    create_table :job_openings do |t|

      t.timestamps
    end
  end
end
