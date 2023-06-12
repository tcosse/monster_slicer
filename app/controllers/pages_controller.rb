class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:game, :home, :gameover]

  def home
  end

  def game
    if MainCharacter.where(user_id: current_user) == []
      @last_save = []
    else
      @last_save = MainCharacter.where(user_id: current_user).last
    end
  end

  def gameover
  end
end
