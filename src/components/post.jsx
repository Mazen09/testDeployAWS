import React, { Component } from "react";
import { getPost } from "./../services/postService";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tags from "./tags";
import Comment from "./comment";
import NewComment from "./newComment";
import { getCategory } from "../services/categoryService";

class Post extends Component {
  state = {
    post: {},
    category: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const post = getPost(id);
    const category = getCategory(post.category_id);
    this.setState({ post, category });
  }

  handleDeleteComment = comment_id => {
    if (confirm("Your comment will be deleted !")) {
      console.log("deleting comment number ", comment_id);
    }
  };

  render() {
    const {
      title,
      username,
      date,
      tags,
      content,
      likes,
      dislikes
    } = this.state.post;

    const comment = {
      id: "1",
      post_id: "1",
      username: "mazen09",
      date: "1-1-2020",
      content: "this is bullshit"
    };

    const { category } = this.state;
    return (
      <div className="card" style={{ margin: 10 }}>
        <div className="card-body">
          <h4 className="card-title">
            {` ${title} \t`}
            <span className="badge badge-secondary">{category}</span>
          </h4>
          <p className="mb-1 text-muted">
            by <Link to={`/profile/${username}`}>{username}</Link> at {date}
          </p>
          <Tags tags={tags} />
          <div className="col card">
            <div className="card-body">
              <ReactMarkdown source={content} escapeHtml={false} />
            </div>
          </div>
          <NewComment />
          <Comment
            id={comment.id}
            post_id={comment.post_id}
            username={comment.username}
            date={comment.date}
            content={comment.content}
            onDelete={this.handleDeleteComment}
          />
        </div>
      </div>
    );
  }
}

export default Post;
