class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:game, :home]

  def home
  end

  def game
  end
end
