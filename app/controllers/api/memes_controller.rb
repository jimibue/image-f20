require "faker"

class Api::MemesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.memes
  end

  def update
    meme = current_user.memes.find(params[:id])

    file = params[:fileX]

    if file
      begin
        # this in the cloud not your database
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        # updating meme image
        # want to do another cloudinary to delete image

        meme[:image_url] = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end

    meme[:description] = params[:descriptionX]

    # updating meme to the database
    if meme.save
      render json: meme
    else
      render json: { errors: meme.errors }
    end
  end

  def create
    meme = current_user.memes.new

    file = params[:fileX]

    if file
      begin
        # this in the cloud not your database
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        # updating meme image
        # want to do another cloudinary to delete image
        Meme.create(description: params[:descriptionX], image_url: cloud_image["secure_url"], user_id: current_user.id)
        render json: meme
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
  end

  def generate_chuck
    # current_user
    # binding.pry
    # want to grab the file object
    file = params[:files]
    if file
      begin
        # upload to cloudinary, this the gem, .env set
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        # upload to cloudinary, this the gem, .env set
        # user.image = cloud_image['secure_url']

        Meme.create(description: Faker::ChuckNorris.fact, image_url: cloud_image["secure_url"], user_id: current_user.id)
        ## have the image_url

        render json: { yo: "worked", file: file, cloud_image: cloud_image }
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
  end

  def generate_chuck_cu
    # current_user
    # binding.pry
    # want to grab the file object
    file = params["could_be_name_just_file"]

    if file
      begin
        # upload to cloudinary, this the gem, .env set
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        # upload to cloudinary, this the gem, .env set
        # user.image = cloud_image['secure_url']

        Meme.create(description: Faker::ChuckNorris.fact, image_url: cloud_image["secure_url"], user_id: current_user.id)
        ## have the image_url

        render json: { yo: "worked", file: file, cloud_image: cloud_image }
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
  end
end
