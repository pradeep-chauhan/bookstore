class BooksController < ApplicationController
  before_action :exists, only: %i[update show destroy]
    
  def index
    render json: { books: Book.all }, status: :ok
  end

  def show
    render json: { book: @book }, status: :ok
  end

  def create
    @book = Book.new(book_params)
    @book.save!
    render json: { book: @book }, status: :ok
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    @book.update!(book_params)
    render json: { book: @book }, status: :ok
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def destroy
    @book.destroy!
    render json: {}, status: :ok
  end

  private

  def exists
    @book = book.find_by_id(params[:id])
    render json: { error: 'book is not found' }, status: :not_found unless @book.present?
  end

  def book_params
    params.require(:book).permit(:title, :isbn, :quantity, :price, :auther_id)
  end
end
