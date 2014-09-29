class SitsController < ApplicationController
  before_action :set_sit, only: [:show, :edit, :update, :destroy]

  # GET /sits
  # GET /sits.json
  def index
    @sits = Sit.all
  end

  # GET /sits/1
  # GET /sits/1.json
  def show
  end

  # GET /sits/new
  def new
    @sit = Sit.new
  end

  # GET /sits/1/edit
  def edit
  end

  # POST /sits
  # POST /sits.json
  def create
    @sit = Sit.new(sit_params)

    respond_to do |format|
      if @sit.save
        format.html { redirect_to @sit, notice: 'Sit was successfully created.' }
        format.json { render action: 'show', status: :created, location: @sit }
      else
        format.html { render action: 'new' }
        format.json { render json: @sit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sits/1
  # PATCH/PUT /sits/1.json
  def update
    respond_to do |format|
      if @sit.update(sit_params)
        format.html { redirect_to @sit, notice: 'Sit was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @sit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sits/1
  # DELETE /sits/1.json
  def destroy
    @sit.destroy
    respond_to do |format|
      format.html { redirect_to sits_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sit
      @sit = Sit.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sit_params
      params.require(:sit).permit(:name, :title, :age)
    end
end
