namespace SpriteKind {
    export const ui = SpriteKind.create()
    export const spike = SpriteKind.create()
    export const placeholder = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    p1hp += -1
    Run_update_hp()
    scene.cameraShake(4, 100)
    pause(500)
})
function Run_update_hp () {
    timer.background(function () {
        p1hpsprite.setImage(image.create(17, 19))
        if (p1hp >= 1) {
            spriteutils.drawTransparentImage(imageassests[2], p1hpsprite.image, 0, 0)
        } else {
            spriteutils.drawTransparentImage(imageassests[3], p1hpsprite.image, 0, 0)
        }
        if (p1hp >= 2) {
            spriteutils.drawTransparentImage(imageassests[2], p1hpsprite.image, 6, 0)
        } else {
            spriteutils.drawTransparentImage(imageassests[3], p1hpsprite.image, 6, 0)
        }
        if (p1hp >= 3) {
            spriteutils.drawTransparentImage(imageassests[2], p1hpsprite.image, 12, 0)
        } else {
            spriteutils.drawTransparentImage(imageassests[3], p1hpsprite.image, 12, 0)
        }
        if (p1hp == 0) {
            if (levelname >= 1) {
                game.setGameOverMessage(false, "GAME OVER!")
                game.gameOver(false)
            }
        }
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.spike, function (sprite, otherSprite) {
    p1hp += -1
    Run_update_hp()
    scene.cameraShake(4, 100)
    pause(200)
})
function summon_ghost (num: number, num2: number) {
    mySprite3 = sprites.create(img`
        e e . . . . e e 
        e e e . . e e e 
        . e e e e e e . 
        . . e e e e . . 
        . . e e e e . . 
        . e e e e e e . 
        e e e . . e e e 
        e e . . . . e e 
        `, SpriteKind.placeholder)
    tiles.placeOnTile(mySprite3, tiles.getTileLocation(num, num2))
    timer.after(500, function () {
        emneysprite = sprites.create(imageassests[4].clone(), SpriteKind.Enemy)
        tiles.placeOnTile(emneysprite, tiles.getTileLocation(num, num2))
        sprites.setDataNumber(emneysprite, "emenytyper", 1)
        sprites.setDataBoolean(emneysprite, "stun", false)
        statusbar = statusbars.create(7, 2, StatusBarKind.Health)
        statusbar.setColor(1, 15, 13)
        statusbar.max = 3
        statusbar.value = 3
        statusbar.attachToSprite(emneysprite, 1, 0)
    })
}
function flip_amage (myImage: Image) {
    image2 = myImage.clone()
    image2.flipX()
    return image2
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    thespikeHitbox.setImage(assets.tile`myTile8`)
    tiles.placeOnTile(thespikeHitbox, location)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(status.spriteAttachedTo())
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    thespikeHitbox.setImage(assets.tile`myTile8`)
    tiles.placeOnTile(thespikeHitbox, location)
})
function startlevel (num: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.MiniMenu)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroy(myTextSprite)
    mySprite = platformer.create(img`
        . . . . . . . . 
        . . 1 1 1 1 . . 
        . . 1 d 1 d . . 
        . . 1 d 1 d . . 
        . . 1 1 1 1 . . 
        . . 1 1 1 1 . . 
        . . 1 1 1 1 . . 
        . . 1 1 1 1 . . 
        `, SpriteKind.Player)
    p1hp = 3
    scene.cameraFollowSprite(mySprite)
    mySprite.setPosition(6255, 99555)
    levelname = num
    if (num == 0) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level5`))
    }
    if (num == 1) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level11`))
    }
    if (num == 2) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level18`))
    }
    if (num == 3) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level22`))
    }
    platformer.loopFrames(
    mySprite,
    sprite_assets[0],
    100,
    platformer.rule(platformer.PlatformerSpriteState.FacingRight, platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.OnGround)
    )
    platformer.loopFrames(
    mySprite,
    flip_anmaion(sprite_assets[0]),
    100,
    platformer.rule(platformer.PlatformerSpriteState.FacingLeft, platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.OnGround)
    )
    platformer.loopFrames(
    mySprite,
    sprite_assets[1],
    500,
    platformer.rule(platformer.PlatformerSpriteState.FacingLeft)
    )
    platformer.loopFrames(
    mySprite,
    flip_anmaion(sprite_assets[1]),
    500,
    platformer.rule(platformer.PlatformerSpriteState.FacingRight)
    )
    platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnAPressed, true)
    platformer.moveSprite(mySprite, true)
    thespikeHitbox = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.spike)
    gunsprtie = sprites.create(imageassests[0], SpriteKind.ui)
    gunsprtie.setFlag(SpriteFlag.Ghost, true)
    p1hpsprite = sprites.create(image.create(17, 19), SpriteKind.ui)
    p1hpsprite.setFlag(SpriteFlag.Ghost, true)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile14`)
    level_start = true
    music.stopAllSounds()
}
function flip_anmaion (list: Image[]) {
    new_list = []
    for (let value of list) {
        image2 = value.clone()
        image2.flipX()
        new_list.push(image2)
    }
    return new_list
}
function wait_untile_all_enemys_are_dead (num: number) {
    pause(600)
    sprites.destroyAllSpritesOfKind(SpriteKind.placeholder)
    nextwave = true
    wave_hp = statusbars.create(100, 4, StatusBarKind.Energy)
    wave_hp.setFlag(SpriteFlag.RelativeToCamera, true)
    wave_hp.setPosition(69, 112)
    wave_hp.setColor(3, 1)
    wave_hp.setLabel("Wave_" + convertToText(num), 3)
    enemycount = 0
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        enemycount += 1
    }
    wave_hp.value = enemycount
    wave_hp.max = enemycount
    while (nextwave) {
        enemycount = 0
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            enemycount += 1
            pause(10)
        }
        wave_hp.value = enemycount
        if (enemycount == 0) {
            nextwave = false
        }
    }
    sprites.destroy(wave_hp)
    if (p1hp <= 2) {
        p1hp += 1
    }
    Run_update_hp()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level_start) {
        if (p1left) {
            projectile = sprites.createProjectileFromSprite(imageassests[1], gunsprtie, -150, 0)
            projectile.y += 1
            projectile.x += -4
        } else {
            projectile = sprites.createProjectileFromSprite(imageassests[1], gunsprtie, 150, 0)
            projectile.y += 1
            projectile.x += 4
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataNumber(otherSprite, "emenytyper") == 2) {
        sprites.destroy(sprite)
        if (!(otherSprite.vx == 0)) {
            sprites.setDataNumber(otherSprite, "Xmovement", otherSprite.vx)
        }
        otherSprite.vx = 0
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -1
        sprites.setDataBoolean(otherSprite, "stun", true)
        timer.after(200, function () {
            otherSprite.vx = sprites.readDataNumber(otherSprite, "Xmovement")
            sprites.setDataBoolean(otherSprite, "stun", false)
        })
    } else if (sprites.readDataNumber(otherSprite, "emenytyper") == 1) {
        sprites.destroy(sprite)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -1
        otherSprite.follow(mySprite, 0)
        sprites.setDataBoolean(otherSprite, "stun", true)
        timer.after(200, function () {
            otherSprite.follow(mySprite, randint(10, 30))
            sprites.setDataBoolean(otherSprite, "stun", false)
        })
    }
})
function startmenu () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("level 1", imageassests[4]),
    miniMenu.createMenuItem("level 2", imageassests[5]),
    miniMenu.createMenuItem("level 3", imageassests[8])
    )
    myMenu.y += -7
    myMenu.x += 15
    myMenu.setPosition(118, 51)
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    animation.runImageAnimation(
    mySprite2,
    [img`
        . . . 1 1 1 1 . . . . . . . . . 
        . . 1 1 1 1 1 . . . . . . . . . 
        . . 1 d 1 d 1 . . . . . . . . . 
        . 1 1 d 1 d . . . . . . . . . . 
        . 1 1 1 1 1 . . . . . . . . . . 
        . 1 1 1 1 1 . . . . . . . . . . 
        . . 1 . . 1 . . . . . . . . . . 
        . . 1 . . 1 . . . . . . . . . . 
        d d d d d d d d d d d d d d d d 
        1 d 1 d 1 d 1 d 1 d 1 d 1 d 1 d 
        d 1 d 1 d 1 d 1 d 1 d 1 d 1 d 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `],
    100,
    true
    )
    mySprite2.z = 44
    mySprite2.setScale(10, ScaleAnchor.Middle)
    mySprite2.setPosition(62, 99)
    animation.runMovementAnimation(
    myMenu,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    myTextSprite = sprites.create(img`
        .11111...11.......................11................................................
        1111111.111......................111................................................
        1111....111......................111.......11111...111.111...........11.11....11111.
        111111..111111...11111...11111..11111.....1111111.111111111.........111.111..1111111
        .111111.1111111.1111111.1111111.11111.....111.111.111111111.........111.111..1111111
        ...1111.1111111.111.111.111.111..111......1111111.111.1.111.........111.111..111.111
        1111111.111.111.1111111.1111111..1111.....111.....111...111.........11111111.1111111
        .11111...11.11...11111...11111....111......11111...11...11...........1111111.111111.
        .............................................................................111....
        .............................................................................111....
        .............................................................................111....
        ..............................................................................11....
        `, SpriteKind.Player)
    myTextSprite.setPosition(115, 21)
    animation.runMovementAnimation(
    myTextSprite,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
}
function summon_slime (num: number, num2: number) {
    mySprite3 = sprites.create(img`
        e e . . . . e e 
        e e e . . e e e 
        . e e e e e e . 
        . . e e e e . . 
        . . e e e e . . 
        . e e e e e e . 
        e e e . . e e e 
        e e . . . . e e 
        `, SpriteKind.placeholder)
    tiles.placeOnTile(mySprite3, tiles.getTileLocation(num, num2))
    timer.after(500, function () {
        emneysprite = sprites.create(imageassests[5].clone(), SpriteKind.Enemy)
        sprites.setDataNumber(emneysprite, "emenytyper", 2)
        emneysprite.vx = 40
        sprites.setDataBoolean(emneysprite, "stun", false)
        emneysprite.ay = 200
        statusbar = statusbars.create(7, 2, StatusBarKind.Health)
        statusbar.setColor(1, 15, 13)
        statusbar.max = 3
        statusbar.value = 3
        statusbar.attachToSprite(emneysprite, 1, 0)
        tiles.placeOnTile(emneysprite, tiles.getTileLocation(num, num2))
        characterAnimations.loopFrames(
        emneysprite,
        [imageassests[5].clone()],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        emneysprite,
        [flip_amage(imageassests[5]).clone()],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
    })
}
let mySprite2: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let projectile: Sprite = null
let p1left = false
let enemycount = 0
let wave_hp: StatusBarSprite = null
let nextwave = false
let new_list: Image[] = []
let level_start = false
let gunsprtie: Sprite = null
let mySprite: platformer.PlatformerSprite = null
let myTextSprite: Sprite = null
let thespikeHitbox: Sprite = null
let image2: Image = null
let statusbar: StatusBarSprite = null
let emneysprite: Sprite = null
let mySprite3: Sprite = null
let levelname = 0
let p1hpsprite: Sprite = null
let p1hp = 0
let imageassests: Image[] = []
let sprite_assets: Image[][] = []
scene.setBackgroundColor(15)
sprite_assets = [[
img`
    . . . . . . . . 
    . . 1 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . . 1 . . 1 . . 
    . . 1 . . 1 . . 
    `,
img`
    . . . . . . . . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . 1 . . 1 . . 
    . . . . . 1 . . 
    `,
img`
    . . . 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . . 1 1 . . . 
    . . . . 1 . . . 
    `,
img`
    . . . 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . . 1 1 . . . 
    . . . 1 . . . . 
    `,
img`
    . . . 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . 1 . . 1 . . 
    . . 1 . . 1 . . 
    `,
img`
    . . . 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . 1 . . 1 . . 
    . . . . . 1 . . 
    `,
img`
    . . . 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . . 1 1 . . . 
    . . . . 1 . . . 
    `,
img`
    . . . 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 d 1 d 1 . 
    . 1 1 d 1 d . . 
    . 1 1 1 1 1 . . 
    . 1 1 1 1 1 . . 
    . . . 1 1 . . . 
    . . . 1 . . . . 
    `
], [img`
    . 1 1 1 1 . . . 
    . 1 1 1 1 1 . . 
    . 1 d 1 d 1 . . 
    . . d 1 d 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 1 1 1 1 . 
    . . 1 . . 1 . . 
    . . 1 . . 1 . . 
    `]]
imageassests = [
image.create(12, 8),
img`
    1 
    `,
img`
    . e . e . 
    e e e e e 
    e e e e e 
    . e e e . 
    . . e . . 
    `,
img`
    . 3 . 3 . 
    3 . 3 . 3 
    3 . . . 3 
    . 3 . 3 . 
    . . 3 . . 
    `,
img`
    . 3 3 3 3 3 . 
    3 d d d d d 3 
    3 d 1 d 1 d 3 
    3 d 1 d 1 d 3 
    3 d d d d d 3 
    3 d d d d d 3 
    e d 3 d 3 d e 
    3 3 . 3 . 3 3 
    `,
img`
    . . . . . . . . 
    . . . . . . . . 
    . . . . . . . . 
    . . e e e e . . 
    . e d d d d e . 
    e d d 1 d 1 d e 
    e d d d d d d e 
    . e e e e e e . 
    `,
img`
    . . . . . . . . 
    . . . e e . . . 
    . . e e e e . . 
    . . d d e d . . 
    . . d 1 d 1 . . 
    . . d d d d . . 
    . . d d d d . . 
    . . d . . d . . 
    `,
img`
    . . . . . . . . 
    . . 1 1 . . 1 . 
    . 1 1 1 1 . 1 . 
    . e 3 1 e . d . 
    . 3 3 3 3 . d . 
    d d e e e 3 d . 
    d d e e e . d . 
    . e . . e . d . 
    `,
img`
    . . . d d . . . 
    . . d d d d . . 
    d d d d d d d d 
    . d d d d d d . 
    . . d d d d . . 
    . d d d d d d . 
    . d d . . d d . 
    `
]
spriteutils.drawTransparentImage(img`
    3 e e 
    3 . . 
    `, imageassests[0], 9, 4)
startmenu()
forever(function () {
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        startlevel(selectedIndex + 1)
    })
    if (level_start) {
        if (controller.left.isPressed()) {
            gunsprtie.setImage(flip_amage(imageassests[0].clone()))
            p1left = true
        } else if (controller.right.isPressed()) {
            gunsprtie.setImage(imageassests[0])
            p1left = false
        }
    }
})
forever(function () {
    if (level_start) {
        for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 40, mySprite)) {
            if (sprites.readDataNumber(value, "emenytyper") == 1) {
                if (!(sprites.readDataBoolean(value, "stun"))) {
                    value.follow(mySprite, randint(10, 30))
                    value.setFlag(SpriteFlag.GhostThroughWalls, true)
                }
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "emenytyper") == 2) {
                if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Left)))) {
                    value.vx = 30
                }
                if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).getNeighboringLocation(CollisionDirection.Right)))) {
                    value.vx = -30
                }
                if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                    value.vx = -30
                }
                if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                    value.vx = 30
                }
            }
        }
    }
})
forever(function () {
    if (level_start) {
        if (levelname == 3) {
            summon_slime(43, 2)
            summon_slime(70, 8)
            summon_slime(25, 4)
            summon_slime(8, 2)
            summon_ghost(21, 10)
            summon_ghost(25, 10)
            summon_ghost(58, 4)
            summon_slime(1, 7)
            summon_ghost(96, 5)
            wait_untile_all_enemys_are_dead(1)
            summon_slime(47, 2)
            summon_slime(81, 8)
            summon_ghost(89, 1)
            summon_ghost(42, 6)
            summon_ghost(48, 6)
            summon_slime(13, 11)
            summon_slime(18, 12)
            summon_slime(28, 12)
            wait_untile_all_enemys_are_dead(2)
            summon_slime(43, 2)
            summon_slime(70, 8)
            summon_slime(25, 4)
            summon_slime(8, 2)
            summon_ghost(21, 10)
            summon_ghost(25, 10)
            summon_ghost(58, 4)
            summon_slime(1, 7)
            summon_ghost(96, 5)
            summon_slime(47, 2)
            summon_slime(81, 8)
            summon_ghost(89, 1)
            summon_ghost(42, 6)
            summon_ghost(48, 6)
            summon_slime(13, 11)
            summon_slime(18, 12)
            summon_slime(28, 12)
            wait_untile_all_enemys_are_dead(3)
            summon_ghost(54, 1)
            summon_ghost(62, 1)
            summon_ghost(58, 4)
            summon_slime(88, 2)
            summon_slime(91, 2)
            summon_ghost(8, 1)
            summon_ghost(16, 1)
            summon_slime(9, 2)
            summon_slime(15, 2)
            summon_slime(45, 2)
            summon_slime(17, 12)
            summon_slime(28, 12)
            summon_ghost(28, 10)
            summon_ghost(18, 10)
            summon_ghost(25, 2)
            summon_slime(33, 4)
            summon_ghost(78, 5)
            wait_untile_all_enemys_are_dead(4)
            pause(1000)
            game.setGameOverMessage(true, "You cleared level 4")
            game.gameOver(true)
        } else {
            if (levelname == 1) {
                summon_ghost(3, 3)
                summon_slime(4, 4)
                summon_slime(18, 3)
                summon_slime(30, 6)
                summon_ghost(41, 6)
                summon_slime(53, 6)
                wait_untile_all_enemys_are_dead(1)
                summon_slime(35, 9)
                summon_slime(47, 9)
                summon_ghost(45, 6)
                summon_ghost(37, 6)
                summon_slime(18, 3)
                summon_slime(4, 4)
                summon_ghost(11, 6)
                summon_slime(15, 11)
                wait_untile_all_enemys_are_dead(2)
                summon_ghost(47, 7)
                summon_ghost(35, 7)
                summon_ghost(41, 6)
                summon_slime(34, 9)
                summon_slime(49, 9)
                summon_slime(4, 4)
                summon_slime(18, 3)
                summon_slime(15, 11)
                wait_untile_all_enemys_are_dead(3)
                summon_ghost(18, 10)
                summon_ghost(6, 10)
                summon_slime(11, 7)
                summon_ghost(38, 6)
                summon_ghost(44, 6)
                summon_slime(53, 6)
                summon_slime(36, 9)
                summon_slime(46, 9)
                summon_slime(30, 6)
                summon_ghost(23, 4)
                summon_slime(41, 9)
                summon_ghost(4, 3)
                wait_untile_all_enemys_are_dead(4)
                pause(1000)
                game.setGameOverMessage(true, "You cleared level 1")
                game.gameOver(true)
            } else if (levelname == 2) {
                summon_ghost(16, 3)
                summon_slime(6, 9)
                summon_slime(18, 9)
                summon_ghost(30, 2)
                summon_ghost(44, 8)
                summon_slime(50, 9)
                summon_slime(38, 2)
                summon_slime(52, 2)
                summon_slime(23, 6)
                wait_untile_all_enemys_are_dead(1)
                summon_ghost(41, 1)
                summon_ghost(49, 1)
                summon_slime(15, 4)
                summon_slime(9, 4)
                summon_ghost(30, 7)
                summon_slime(39, 9)
                summon_slime(50, 9)
                summon_ghost(2, 4)
                wait_untile_all_enemys_are_dead(2)
                summon_ghost(21, 5)
                summon_ghost(24, 5)
                summon_slime(30, 3)
                summon_slime(28, 8)
                summon_slime(32, 8)
                summon_ghost(38, 8)
                summon_ghost(3, 4)
                summon_slime(2, 9)
                summon_slime(38, 2)
                summon_slime(52, 2)
                summon_slime(45, 2)
                summon_slime(50, 9)
                wait_untile_all_enemys_are_dead(3)
                summon_ghost(16, 3)
                summon_slime(6, 9)
                summon_slime(18, 9)
                summon_ghost(30, 2)
                summon_ghost(44, 8)
                summon_slime(50, 9)
                summon_slime(38, 2)
                summon_slime(52, 2)
                summon_slime(23, 6)
                summon_ghost(41, 1)
                summon_ghost(49, 1)
                summon_slime(15, 4)
                summon_slime(9, 4)
                summon_ghost(30, 7)
                summon_slime(39, 9)
                summon_slime(50, 9)
                summon_ghost(2, 4)
                wait_untile_all_enemys_are_dead(4)
                pause(1000)
                game.setGameOverMessage(true, "You cleared level 2")
                game.gameOver(true)
            }
        }
    }
})
game.onUpdate(function () {
    if (level_start) {
        p1hpsprite.setPosition(mySprite.x, mySprite.y)
        gunsprtie.setPosition(mySprite.x, mySprite.y)
    }
})
