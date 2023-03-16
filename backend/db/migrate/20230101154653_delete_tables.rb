class DeleteTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :job_openings
    drop_table :rates
  end
end
