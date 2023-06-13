class AddCoinsAndKillsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :total_coins, :integer
    add_column :users, :total_kills, :integer
  end
end
