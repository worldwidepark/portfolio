class CreateWallets < ActiveRecord::Migration[7.0]
  def change
    create_table :wallets do |t|
      t.integer :employer_id, null:false
      t.integer :balance, default: 0
      t.timestamps
    end
  end
end
