import Artwork from '../models/Artwork.js';
import * as aiService from '../services/aiService.js';

// @desc    Get all artworks (for moderation)
// @route   GET /api/artworks/admin
// @access  Private/Admin
export const getAllArtworks = async (req, res) => {
  const artworks = await Artwork.find({}).populate('artist', 'name');
  res.json(artworks);
};

// @desc    Get all artworks (approved only for marketplace)
// @route   GET /api/artworks
// @access  Public
export const getArtworks = async (req, res) => {
  const artworks = await Artwork.find({ status: 'approved' }).populate('artist', 'name');
  res.json(artworks);
};

// @desc    Get single artwork
// @route   GET /api/artworks/:id
// @access  Public
export const getArtworkById = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id).populate('artist', 'name');
  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ message: 'Artwork not found' });
  }
};

// @desc    Create new artwork
// @route   POST /api/artworks
// @access  Private/User
export const createArtwork = async (req, res) => {
  const { title, description, price, image, category, tags, useAI } = req.body;

  let finalDescription = description;
  let finalTags = tags || [];

  // Optional AI Enhancement
  if (useAI) {
    const [aiDescription, aiTags] = await Promise.all([
      aiService.generateArtworkDescription(title, category),
      aiService.generateArtworkTags(title, category)
    ]);
    finalDescription = aiDescription;
    finalTags = aiTags;
  }

  const artwork = new Artwork({
    title,
    description: finalDescription,
    price,
    image,
    category,
    tags: finalTags,
    artist: req.user._id,
  });

  const createdArtwork = await artwork.save();
  res.status(201).json(createdArtwork);
};

// @desc    Enhance existing artwork with AI
// @route   POST /api/artworks/:id/enhance
// @access  Private/User
export const enhanceArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  if (!artwork) {
    return res.status(404).json({ message: 'Artwork not found' });
  }

  // Ensure only the artist can enhance their own work
  if (artwork.artist.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const [aiDescription, aiTags] = await Promise.all([
    aiService.generateArtworkDescription(artwork.title, artwork.category),
    aiService.generateArtworkTags(artwork.title, artwork.category)
  ]);

  artwork.description = aiDescription;
  artwork.tags = aiTags;
  
  const updatedArtwork = await artwork.save();
  res.json(updatedArtwork);
};

// @desc    Moderate artwork (Approve/Reject)
// @route   PUT /api/artworks/:id/moderate
// @access  Private/Admin/SubAdmin
export const moderateArtwork = async (req, res) => {
  const { status } = req.body;
  const artwork = await Artwork.findById(req.params.id);

  if (artwork) {
    artwork.status = status;
    const updatedArtwork = await artwork.save();
    res.json(updatedArtwork);
  } else {
    res.status(404).json({ message: 'Artwork not found' });
  }
};
