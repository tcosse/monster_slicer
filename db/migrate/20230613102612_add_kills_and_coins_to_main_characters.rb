class AddKillsAndCoinsToMainCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :main_characters, :kills, :integer
    add_column :main_characters, :coins, :integer
  end
end
