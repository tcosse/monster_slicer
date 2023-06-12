class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:game, :home, :gameover]

  def home
  end

  def game
    @last_save = MainCharacter.where(user_id: current_user).last
  end

  def gameover
  end
end
