class CreateMainCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :main_characters do |t|
      t.string :x
      t.string :y
      t.string :health
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
