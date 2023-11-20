# external libraries
from flask import (
    Flask,
    render_template,
    send_from_directory,
    current_app
)
from flask_pymongo import PyMongo
import os

# internal libraries
from processing import (
    brain_dump_processing
)


# setting up flask app and config variables
app = Flask(__name__, template_folder='../public', static_folder='../public', static_url_path='')
app.config["SECRET_KEY"] = "3b6057ccf96d1158a4eac04dcfaec52cab7cd7a4e"
app.config["MONGO_URI"] = "mongodb+srv://olicluster_admin:Sup3rblydone@olicluster.zxkcnzp.mongodb.net/?retryWrites=true&w=majority"

# connecting to mongo db
mongo = PyMongo(app)

# landing page
@app.route('/')
def home():
    return render_template("index.html")

# load a page's html
@app.route('/pages/<page_name>')
def load_page(page_name):
    return render_template(f"../public/pages/{page_name}/{page_name}.html")

# load the js or css for a page
@app.route('/pages/<page_name>/<file_name>')
def load_page_resource(page_name, file_name):
    directory_path = os.path.join(current_app.root_path, '../public/pages', page_name)

    # Inline lambda function for processing (effectively a switch statement)
    (lambda func: func() if func is not None else None)(
        {
            "brain_dump": brain_dump_processing
        }.get(page_name)
    )

    return send_from_directory(directory_path, file_name)


if __name__ == '__main__':
    app.run(debug=True)