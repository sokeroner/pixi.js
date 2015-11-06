var BaseTexture = require('./BaseTexture'),
    utils = require('../utils');

function CanvasVideoBaseTexture(source, scaleMode)
{

    var that = this;

    if (!source)
    {
        throw new Error('No CanvasVideo source element specified.');
    }

    BaseTexture.call(this, source.element, scaleMode);
    source.addEventListener('timeupdate', this._onUpdate.bind(this));

}

CanvasVideoBaseTexture.prototype = Object.create(BaseTexture.prototype);
CanvasVideoBaseTexture.prototype.constructor = CanvasVideoBaseTexture;
module.exports = CanvasVideoBaseTexture;



/**
 * The internal update loop of the canvasvideo base texture.
 *
 * @private
 */
CanvasVideoBaseTexture.prototype._onUpdate = function ()
{
    this.update ();
};



/**
 * Helper function that creates a base texture from the given canvas element.
 *
 * @static
 * @param canvas {Canvas} The canvas element source of the texture
 * @param scaleMode {number} See {@link PIXI.SCALE_MODES} for possible values
 * @return PIXI.CanvasVideoBaseTexture
 */
CanvasVideoBaseTexture.fromCanvasVideo = function (canvasVideo, scaleMode)
{
    var canvas = canvasVideo.element;
    if (!canvasVideo.element._pixiId)
    {
        canvasVideo.element._pixiId = 'canvas_' + utils.uid();
    }

    var baseTexture = utils.BaseTextureCache[canvasVideo.element._pixiId];

    if (!baseTexture)
    {
        baseTexture = new CanvasVideoBaseTexture(canvasVideo, scaleMode);
        utils.BaseTextureCache[canvasVideo.element._pixiId] = baseTexture;
    }

    return baseTexture;
};
