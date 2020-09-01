class CommentsController < ApplicationController
  before_action :find_song
  before_action :authenticate_user!

  def create
    @comment = @song.comments.new(comment_params)
    if @comment.save
      redirect_to @song
    else
      redirect_to @song
    end
  end

  def destroy
    @comment = @song.comments.find(params[:id])
    redirect_to @song if @comment.destroy
  end

  private 
  def find_song
    @song = Song.find(params[:song_id])
  end

  def comment_params
    params.require(:comment).permit(:content, :reply_id).merge(user: current_user)
  end
end