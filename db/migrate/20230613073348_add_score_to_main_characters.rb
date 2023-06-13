class AddScoreToMainCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :main_characters, :score, :integer
  end
end
