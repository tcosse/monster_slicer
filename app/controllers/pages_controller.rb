class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:game, :home, :gameover]

  def home
  end

  def game
  end

  def gameover
  end
end
