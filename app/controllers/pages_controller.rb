class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :gameover]

  def home
  end

  def game
    if MainCharacter.where(user_id: current_user) == []
      @last_save = []
    else
      @last_save = MainCharacter.where(user_id: current_user).last
    end
  end

  def leaderboard
    highScore = 0
    totalCoins = 0
    totalKills = 0
    MainCharacter.where(user_id: current_user).each do |mc|
      if mc.score != nil
        if mc.score > highScore
          highScore = mc.score
        end
      end
      if mc.coins != nil
        totalCoins += mc.coins
      end
      if mc.kills != nil
        totalKills += mc.kills
      end
    end
    p highScore
    p totalCoins
    p totalKills
    current_user.highscore = highScore
    current_user.total_coins = totalCoins
    current_user.total_kills = totalKills
    current_user.save
    p current_user
  end

  def gameover
    @your_score = MainCharacter.where(user_id: current_user).last.score
  end

  def win
    @your_score = MainCharacter.where(user_id: current_user).last.score
  end
end
