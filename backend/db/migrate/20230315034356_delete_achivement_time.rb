class DeleteAchivementTime < ActiveRecord::Migration[7.0]
  def change
    remove_column :achivements, :start_time
    remove_column :achivements, :finished_time
  end
end
