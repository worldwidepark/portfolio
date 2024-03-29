# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_29_125536) do
  create_table "achivements", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.string "urls"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "start_date_on", null: false
    t.date "end_date_on", null: false
    t.index ["user_id"], name: "index_achivements_on_user_id"
  end

  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "bookmarks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "bookmarker_id"
    t.integer "bookmarked_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bookmarked_id"], name: "index_bookmarks_on_bookmarked_id"
    t.index ["bookmarker_id", "bookmarked_id"], name: "index_bookmarks_on_bookmarker_id_and_bookmarked_id", unique: true
    t.index ["bookmarker_id"], name: "index_bookmarks_on_bookmarker_id"
  end

  create_table "charge_histories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "employer_id", null: false
    t.integer "amount_of_charge", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "chats", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "chatter_type", null: false
    t.integer "room_id", null: false
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "daily_reports", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "text"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "time", null: false
    t.date "report_date_on", null: false
    t.index ["user_id"], name: "index_daily_reports_on_user_id"
  end

  create_table "presentations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "target_type", null: false
    t.bigint "target_id", null: false
    t.boolean "present", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["target_type", "target_id"], name: "index_presentations_on_target"
    t.index ["user_id"], name: "index_presentations_on_user_id"
  end

  create_table "programming_language_users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "programming_language_id"
    t.index ["programming_language_id"], name: "index_programming_language_users_on_programming_language_id"
    t.index ["user_id"], name: "index_programming_language_users_on_user_id"
  end

  create_table "programming_languages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "employer_id", null: false
    t.boolean "got_chat_offer", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "combined_time", default: 0.0, null: false
    t.string "occupation"
    t.text "introduce"
    t.json "url"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "wallets", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "employer_id", null: false
    t.integer "balance", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "work_experiences", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "job_title"
    t.text "duties"
    t.integer "dates_of_employment"
    t.text "achievements"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_work_experiences_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "work_experiences", "users"
end
