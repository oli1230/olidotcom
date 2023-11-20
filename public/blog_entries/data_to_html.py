import json
import os

absolute_path_prefix = "blog_entries/"

def generate_blog_html(entry_folder, is_first_entry):
    # Read the JSON data
    with open(os.path.join(entry_folder, "entry_data.json"), 'r') as file:
        data = json.load(file)

    content_data = data['content']

    # Start of HTML code block
    html_content = "<div class='brain_dump_entry_container'><div class='brain_dump_entry'><div class='brain_dump_entry_navbar'></div>"

    # Loop through each item in the content
    for key in content_data.keys():
        file_name = content_data[key]
        file_path = os.path.join(entry_folder, 'media', file_name)

        if key.startswith('text'):
            # Add text content to HTML
            with open(file_path, 'r') as text_file:
                text_content = text_file.read()
                html_content += f"<div class='brain_dump_entry_text'>{text_content}</div>"
        elif key.startswith('picture'):
            # Add image content to HTML
            absolute_file_path = os.path.join(absolute_path_prefix, file_path)
            html_content += f'<img class="brain_dump_entry_picture" src="{absolute_file_path}" alt="{file_name}">'

    # End of HTML document
    html_content += "</div></div>\n\n"

    # Determine file mode: overwrite for the first entry, append for others
    file_mode = 'w' if is_first_entry else 'a'

    # Write HTML content to a file
    with open('output.html', file_mode) as html_file:
        html_file.write(html_content)

# Iterate through each entry folder
first_entry = True
for item in os.listdir():
    if item.startswith("entry_"): 
        generate_blog_html(item, first_entry)
        first_entry = False
