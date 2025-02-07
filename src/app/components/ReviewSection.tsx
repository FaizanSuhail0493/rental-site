
'use client';
import Image from 'next/image';
import React, { useState } from 'react';


const ReviewSection = () => {
  const [comments, setComments] = useState<{ name: string; profile: string; rating: number; text: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const dummyProfile = '/image7.png';
  const dummyName = 'User 1';

  const handleAddComment = () => {
    if (newComment.trim() && rating > 0) {
      setComments([
        ...comments,
        {
          name: dummyName,
          profile: dummyProfile,
          rating,
          text: newComment,
        },
      ]);
      setNewComment('');
      setRating(0);
    }
  };

  return (
    <div>
      {/* Add a Comment */}
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-2 border border-gray-400 rounded-lg"
          rows={4}
        ></textarea>
        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            >
              ⭐
            </span>
          ))}
        </div>
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>

      {/* Display Comments */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm mb-4 flex items-start gap-4"
            >
              <Image
                src={comment.profile}
                alt={comment.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold">{comment.name}</h3>
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: comment.rating }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mt-2">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;