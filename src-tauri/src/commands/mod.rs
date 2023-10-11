#[tauri::command]
pub fn my_custom_command_js() {
    println!("I was invoked from JS!");
}
