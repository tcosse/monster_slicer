class AddHighScoreToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :highscore, :integer
  end
end
