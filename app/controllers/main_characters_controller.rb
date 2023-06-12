class MainCharactersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @character = MainCharacter.new(character_params)
    @character.user = current_user
    @character.save
  end

  private

  def character_params
    params.require(:mainCharacter).permit(:x, :y, :health)
  end
end
